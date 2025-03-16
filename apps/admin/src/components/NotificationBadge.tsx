interface NotificationBadgeProps {
  value: number;
}

export const NotificationBadge = ({ value }: NotificationBadgeProps) => {
  return (
    <div
      className="inline-flex border transition-colors focus:outline-none focus:ring-2 
                focus:ring-ring focus:ring-offset-2 border-transparent bg-primary 
                text-primary-foreground hover:bg-primary/80 absolute bottom-[calc(100%-12px)] 
                left-[calc(100%-12px)] h-4 w-4 items-center justify-center rounded-full 
                p-0 text-[8px] font-semibold"
    >
      {value}
    </div>
  );
};
