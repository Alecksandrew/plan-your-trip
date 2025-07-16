import TouristAttractionCardSkeleton from "./TouristAttractionCardSkeleton";

export default function DailyItinerarySkeleton() {
  return (
    <div className="flex flex-col gap-5 border-2 border-paleta-01 rounded p-3 bg-paleta-03 shadow-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl bg-gray-500 animate-pulse p-1 rounded h-10 w-22"></h1>
        <div className="text-lg font-medium flex gap-x-2 h-10 w-20 bg-gray-500 animate-pulse rounded"></div>
      </div>
      <TouristAttractionCardSkeleton />
    </div>
  );
}
