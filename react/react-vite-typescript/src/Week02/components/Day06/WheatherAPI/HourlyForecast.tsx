interface HourlyItem {
  time: string;
  temp: number;
  icon: string;
  isNow?: boolean;
}

interface HourlyForecastProps {
  items: HourlyItem[];
}

export default function HourlyForecast({ items }: HourlyForecastProps) {
  return (
    <div className="bg-white bg-opacity-80 rounded-2xl p-4 mt-6 mx-2">
      <div className="flex flex-row justify-between items-center gap-4 overflow-x-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[60px]">
            <span
              className={`text-sm font-semibold ${
                item.isNow ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.time}
            </span>
            <img src={item.icon} alt="icon" className="w-8 h-8 my-1" />
            <span className="text-lg font-bold text-gray-900">
              {item.temp}&deg;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
