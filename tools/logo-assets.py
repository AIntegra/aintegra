"""
Genera los assets de logo con fondo transparente a partir de los dos PNG/JPG
originales (que vienen con el fondo "quemado": blanco en uno, azul en el otro).

    python tools/logo-assets.py

Sale en src/assets/img/:
  aintegra-logo-dark.png   lockup completo para fondos OSCUROS
  aintegra-logo-light.png  lockup completo para fondos CLAROS
  aintegra-mark-dark.png   solo el emblema, fondos oscuros
  aintegra-mark-light.png  solo el emblema, fondos claros
  favicon-*.png            emblema cuadrado

El destintado ("unmultiply") recupera el canal alfa a partir de un fondo plano
conocido, así que los bordes quedan limpios sobre cualquier superficie y no
solo sobre el color original.
"""
from PIL import Image
import numpy as np
import os

SRC_DARK = 'Logo.jpg'          # arte claro sobre fondo (0, 16, 32)
SRC_LIGHT = 'logo blanco.png'  # arte oscuro sobre fondo blanco
OUT = 'src/assets/img'


def unmultiply(path, bg, lighter_than_bg):
    """Devuelve RGBA con el fondo plano `bg` convertido en transparencia."""
    im = np.asarray(Image.open(path).convert('RGB')).astype(np.float32)
    bg = np.array(bg, dtype=np.float32)

    if lighter_than_bg:                      # arte claro sobre fondo oscuro
        denom = np.maximum(255.0 - bg, 1.0)
        alpha = np.clip((im - bg) / denom, 0, 1).max(axis=2)
    else:                                    # arte oscuro sobre fondo claro
        denom = np.maximum(bg, 1.0)
        alpha = np.clip((bg - im) / denom, 0, 1).max(axis=2)

    a = np.maximum(alpha, 1e-4)[..., None]
    color = np.clip(bg + (im - bg) / a, 0, 255)
    rgba = np.dstack([color, alpha * 255]).astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


def trim(im, pad=0):
    """Recorta al contenido visible."""
    box = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    l, t, r, b = box
    return im.crop((max(l - pad, 0), max(t - pad, 0),
                    min(r + pad, im.width), min(b + pad, im.height)))


def split_mark(im):
    """Separa el emblema del texto.

    No hay ninguna fila vacía entre el pétalo inferior del loto y la palabra
    AIntegra: se tocan. Así que en vez de buscar un hueco se busca el ARRANQUE
    del texto, que es donde la densidad de píxeles por fila se dispara (el
    pétalo termina en punta, con muy poca densidad, y la línea de mayúsculas
    empieza de golpe). El corte va en la fila de densidad mínima de esa banda,
    que es justo donde acaba la punta del pétalo y aún no han entrado las
    letras.
    """
    rows = (np.asarray(im.getchannel('A')) > 8).sum(axis=1).astype(float)
    h = len(rows)
    band = slice(int(h * 0.60), int(h * 0.78))
    cut = band.start + int(np.argmin(rows[band]))

    return trim(im.crop((0, 0, im.width, cut)))


def save(im, name):
    """Cuantiza a paleta antes de guardar: el arte es de color plano, así que
    128 colores son indistinguibles del original y pesan una fracción."""
    path = os.path.join(OUT, name)
    im.quantize(colors=128, method=Image.Quantize.FASTOCTREE).save(path, optimize=True)
    print(f'  {name}  {im.width}x{im.height}  {os.path.getsize(path) // 1024} KB')


def main():
    os.makedirs(OUT, exist_ok=True)

    for src, bg, lighter, suffix in [
        (SRC_DARK, (0, 16, 32), True, 'dark'),    # se usa SOBRE fondo oscuro
        (SRC_LIGHT, (255, 255, 255), False, 'light'),
    ]:
        full = trim(unmultiply(src, bg, lighter))
        mark = split_mark(full)

        save(full.resize((640, round(640 * full.height / full.width)), Image.LANCZOS),
             f'aintegra-logo-{suffix}.png')
        save(mark.resize((256, round(256 * mark.height / mark.width)), Image.LANCZOS),
             f'aintegra-mark-{suffix}.png')

    # Favicon: emblema para fondo claro, cuadrado y centrado.
    mark = split_mark(trim(unmultiply(SRC_LIGHT, (255, 255, 255), False)))
    side = max(mark.size)
    square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    square.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2), mark)
    for px in (32, 180, 512):
        save(square.resize((px, px), Image.LANCZOS), f'favicon-{px}.png')


if __name__ == '__main__':
    main()
