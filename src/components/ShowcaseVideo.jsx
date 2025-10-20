import React from "react";
import { motion } from "framer-motion";

const ShowcaseVideo = ({ t }) => {
  return (
    <div className="flex flex-col items-center w-full py-20 bg-gradient-to-b from-transparent to-black/10">
      {/* 🔹 Título y subtítulo dinámicos */}
  

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl text-white/70 text-center mb-10 max-w-3xl"
      >
        
      </motion.p>

      {/* 💻 Video con marco Apple-style y controles */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="relative w-[90%] max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_10px_50px_rgba(0,0,0,0.35)]"
      >
        <video
          src="/video/demo.mp4" // 📂 Asegúrate de que esté en public/video/demo.mp4
          className="w-full h-full object-cover"
          controls   // ✅ Permite pausar, adelantar, retroceder y pantalla completa
          playsInline
        />

        {/* Marco brillante */}
        <div className="absolute inset-0 rounded-3xl border-[2px] border-white/20 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[25%] bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default ShowcaseVideo;
