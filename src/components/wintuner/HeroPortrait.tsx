export const HeroPortrait = () => {
  return (
    <div className="relative flex justify-center">
      <div className="relative animate-scale-in max-w-[320px] w-full">
        {/* Rotating rings */}
        <div className="absolute -inset-5 rounded-[2rem] border border-dashed border-[#a8ff3e]/20 animate-spin-slower pointer-events-none" />
        <div className="absolute -inset-10 rounded-[3rem] border border-[#a8ff3e]/5 animate-spin-slow pointer-events-none" />
        <div className="absolute -inset-10 animate-spin-slow pointer-events-none">
          <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#a8ff3e] shadow-lg" />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#1e2230] bg-[#0f1117] p-1.5 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#1e2230] bg-black/20 text-[9px] font-mono text-[#6b7280]">
            <div className="flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500/60" />
              <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
              <div className="h-2 w-2 rounded-full bg-[#a8ff3e]/60" />
            </div>
            <span>identity_protocol.v0</span>
            <div className="w-4" />
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-lg group bg-black/20">
            <img
              src="/thanatphong.png"
              alt="Thanatphong Portrait"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Status cards overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/10 bg-black/50 backdrop-blur-md p-2 text-white">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a8ff3e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a8ff3e]" />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-[#6b7280]">Status</span>
                  <span className="font-mono text-[10px] text-[#a8ff3e] font-bold">FORGING</span>
                </div>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex flex-col items-end">
                <span className="font-mono text-[8px] uppercase text-[#6b7280]">Uptime</span>
                <span className="font-mono text-[10px] text-[#9ca3af]">99.9%</span>
              </div>
            </div>
          </div>

          {/* Coordinates metadata footer */}
          <div className="px-3 py-3 grid grid-cols-2 gap-2 text-[9px] font-mono border-t border-[#1e2230]/40 bg-black/20">
            <div>
              <p className="text-[#6b7280] uppercase">Coordinates</p>
              <span className="text-white hover:text-[#a8ff3e]">18.8004° N, 98.9507° E</span>
            </div>
            <div className="text-right">
              <p className="text-[#6b7280] uppercase">Kernel</p>
              <span className="text-[#a8ff3e]">v16.2.4-stable</span>
            </div>
          </div>
        </div>

        {/* Badges decorations */}
        <div className="absolute -right-4 -top-4 rounded-xl border border-[#a8ff3e]/30 bg-[#0f1117] backdrop-blur-xl px-3 py-1.5 font-mono text-[9px] text-[#a8ff3e] animate-float shadow-xl">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#a8ff3e] animate-pulse" />
            <span>AUTHORIZED_USER</span>
          </div>
        </div>
        <div className="absolute -bottom-4 -left-4 rounded-xl border border-[#1e2230] bg-[#0f1117] px-3 py-1.5 font-mono text-[9px] text-[#6b7280] animate-float shadow-md">
          LOC: BANGKOK_TH
        </div>
      </div>
    </div>
  )
}
