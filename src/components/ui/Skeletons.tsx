export function SkeletonCard() {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 animate-pulse">
      <div className="h-4 w-24 bg-zinc-800 rounded mb-4" />
      <div className="h-8 w-32 bg-zinc-800 rounded mb-3" />
      <div className="h-3 w-full bg-zinc-800 rounded mb-2" />
      <div className="h-3 w-2/3 bg-zinc-800 rounded" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 animate-pulse">
      <div className="h-6 w-6 bg-zinc-800 rounded" />
      <div className="h-4 w-40 bg-zinc-800 rounded" />
      <div className="h-4 w-24 bg-zinc-800 rounded ml-auto" />
      <div className="h-4 w-16 bg-zinc-800 rounded" />
    </div>
  );
}

export function SkeletonTable({ rows = 10 }: { rows?: number }) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={i > 0 ? 'border-t border-zinc-800' : ''}
        >
          <SkeletonRow />
        </div>
      ))}
    </div>
  );
}

export function SpinningTire({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-zinc-800 rounded-full" />
        <div className="absolute inset-1 border-4 border-transparent border-t-[#E10600] rounded-full animate-spin" />
        <div className="absolute inset-3 bg-zinc-800 rounded-full" />
      </div>
      {label && (
        <p className="text-zinc-500 text-sm font-mono tracking-wider uppercase">
          {label}
        </p>
      )}
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-[#E10600]/40 p-8 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-[#E10600]/10 flex items-center justify-center">
        <span className="text-[#E10600] text-2xl font-bold">!</span>
      </div>
      <h3 className="text-[#E10600] font-bold text-lg font-mono uppercase tracking-wide">
        Red Flag
      </h3>
      <p className="text-zinc-400 text-sm max-w-md">
        {message || 'Pit lane closed. Live data unavailable — showing offline fallback data.'}
      </p>
    </div>
  );
}
