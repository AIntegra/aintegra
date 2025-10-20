import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { useState, useRef } from "react"

export default function ShowcaseVideo({ t }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  return (
    <section className="relative py-24">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-fuchsia-500/5" />

      <div className="relative max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
            See It In Action
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Watch how AIntegra transforms human-computer interaction
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Video wrapper with premium styling */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/20 bg-black shadow-2xl">
            {/* Gradient overlay for premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

            {/* Video element */}
            <video
              ref={videoRef}
              src="/video/demo.mp4"
              className="w-full h-full object-cover"
              playsInline
              loop
              muted={muted}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />

            {/* Custom controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setMuted(!muted)}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div className="flex-1" />

                <button
                  onClick={() => videoRef.current?.requestFullscreen()}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-[inherit] ring-2 ring-indigo-500/0 group-hover:ring-indigo-500/50 transition-all duration-500 pointer-events-none" />
          </div>

          {/* Decorative elements */}
          <div className="absolute -z-10 inset-0 blur-3xl opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-fuchsia-500 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
