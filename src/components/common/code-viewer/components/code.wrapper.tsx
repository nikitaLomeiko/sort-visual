interface IProps {
  children: React.ReactNode;
  title: string;
}

export const CodeWrapper: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl bg-[var(--bg-primary-to)] border border-[var(--bg-primary-to)]">
      <div className="flex items-center justify-between px-4 py-3  bg-[var(--bg-secondary-to)]/80 border-b border-[var(--bg-primary-from)]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-[var(--text-primary)] font-medium truncate px-4">
          {title}
        </div>
        <div className="w-12"></div>
      </div>

      <div className="relative">{children}</div>
    </div>
  );
};
