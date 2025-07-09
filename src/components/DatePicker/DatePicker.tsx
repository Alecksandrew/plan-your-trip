import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { classNames } from "primereact/utils";

export default function DatePicker() {
  const [dates, setDates] = useState(null);

  const TRANSITIONS = {
    overlay: {
      timeout: 150,
      classNames: {
        enter: "opacity-0 scale-75",
        enterActive:
          "opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in",
        exit: "opacity-100",
        exitActive: "!opacity-0 transition-opacity duration-150 ease-linear",
      },
    },
  };

  const Tailwind = {
    calendar: {
      root: ({ props }) => ({
        className: classNames("inline-flex max-w-full relative", {
          "opacity-60 select-none pointer-events-none cursor-default":
            props.disabled,
        }),
      }),
      input: ({ props }) => ({
        root: {
          className: classNames(
            "font-sans text-base text-paleta-04 text-bold dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none border-paleta-01 bg-paleta-01 rounded-none font-semibold",
            "hover:border-paleta-01",
            {
              "rounded-lg": !props.showIcon,
              "border-r-0 rounded-l-lg rounded-none": props.showIcon,
            }
          ),
        },
      }),
      dropdownButton: {
        root: ({ props }) => ({
          className: classNames({ "rounded-l-none bg-paleta-01 flex items-center justify-center p-2 rounded": props.icon }),
        }),
      },
      panel: ({ props }) => ({
        className: classNames("bg-white dark:bg-gray-900", "min-w-full", {
          "shadow-md border-0 absolute": !props.inline,
          "inline-block overflow-x-auto border border-gray-300 dark:border-blue-900/40 p-2 rounded-lg":
            props.inline,
        }),
      }),
      header: {
        className: classNames(
          "flex items-center justify-between",
          "p-2 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-semibold m-0 border-b border-gray-300 dark:border-blue-900/40 rounded-t-lg"
        ),
      },
      previousButton: {
        className: classNames(
          "flex items-center justify-center cursor-pointer overflow-hidden relative",
          "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
          "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 "
        ),
      },
      title: { className: "leading-8 mx-auto" },
      monthTitle: {
        className: classNames(
          "text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2",
          "mr-2",
          "hover:text-blue-500"
        ),
      },
      yearTitle: {
        className: classNames(
          "text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2",
          "hover:text-blue-500"
        ),
      },
      nextButton: {
        className: classNames(
          "flex items-center justify-center cursor-pointer overflow-hidden relative",
          "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
          "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 "
        ),
      },
      table: {
        className: classNames("border-collapse w-full", "my-2"),
      },
      tableHeaderCell: { className: "p-2" },
      weekday: { className: "text-gray-600 dark:text-white/70" },
      day: { className: "p-2" },
      dayLabel: ({ context }) => ({
        className: classNames(
          "w-10 h-10 rounded-sm transition-shadow duration-200 border-transparent border",
          "flex items-center justify-center mx-auto overflow-hidden relative",
          "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
          {
            "opacity-60 cursor-default": context.disabled,
            "cursor-pointer": !context.disabled,
          },
          {
            "text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80":
              !context.selected && !context.disabled,
            "text-paleta-03 bg-paleta-01 hover:bg-paleta-01-light":
              context.selected && !context.disabled,
          }
        ),
      }),
      monthPicker: { className: "my-2" },
      month: ({ context }) => ({
        className: classNames(
          "w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
          "p-2 transition-shadow duration-200 rounded-lg",
          "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
          {
            "text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80":
              !context.selected && !context.disabled,
            "text-blue-700 bg-blue-100 hover:bg-blue-200":
              context.selected && !context.disabled,
          }
        ),
      }),
      yearPicker: {
        className: classNames("my-2"),
      },
      year: ({ context }) => ({
        className: classNames(
          "w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
          "p-2 transition-shadow duration-200 rounded-lg",
          "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
          {
            "text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80":
              !context.selected && !context.disabled,
            "text-blue-700 bg-blue-100 hover:bg-blue-200":
              context.selected && !context.disabled,
          }
        ),
      }),
      timePicker: {
        className: classNames(
          "flex justify-center items-center",
          "border-t-1 border-solid border-gray-300 p-2"
        ),
      },
      separatorContainer: { className: "flex items-center flex-col px-2" },
      separator: { className: "text-xl" },
      hourPicker: { className: "flex items-center flex-col px-2" },
      minutePicker: { className: "flex items-center flex-col px-2" },
      ampmPicker: { className: "flex items-center flex-col px-2" },
      incrementButton: {
        className: classNames(
          "flex items-center justify-center cursor-pointer overflow-hidden relative",
          "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
          "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 "
        ),
      },
      decrementButton: {
        className: classNames(
          "flex items-center justify-center cursor-pointer overflow-hidden relative",
          "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
          "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 "
        ),
      },
      groupContainer: { className: "flex" },
      group: {
        className: classNames(
          "flex-1",
          "border-l border-gray-300 pr-0.5 pl-0.5 pt-0 pb-0",
          "first:pl-0 first:border-l-0"
        ),
      },
      transition: TRANSITIONS.overlay,
    },
  };

  return (
    <div>
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <div className="card flex justify-content-center">
          <Calendar
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
            showIcon
          />
        </div>
      </PrimeReactProvider>
    </div>
  );
}
