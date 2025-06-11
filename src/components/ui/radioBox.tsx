import { Dispatch, SetStateAction } from "react";

export default function RadioBox({
  setExperimental,
}: {
  setExperimental: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <p className="text-center">
        Choose which model you&apos;d like to use to generate your meal plan.
      </p>
      <form className="flex flex-row space-x-10">
        <div className="flex-col items-center flex group">
          <label htmlFor="experimental" className="text-gray-700">
            (Recommended)
          </label>
          <label htmlFor="experimental">Gemini 2.5 Flash</label>
          <input
            type="radio"
            defaultChecked={true}
            onChange={() => setExperimental(true)}
            name="model"
            id="experimental"
          ></input>
          <p className="max-w-md text-balance text-center invisible group-hover:visible transition-all delay-150 duration-150">
            This model offers much better thinking capabilities but may take a
            while to reason and think.
          </p>
        </div>

        <div className="flex flex-col items-center group">
          <label htmlFor="experimental" className="text-gray-700">
            (Fastest)
          </label>
          <label htmlFor="standard">Gemini 2.0 Flash</label>
          <input
            type="radio"
            defaultChecked={false}
            onChange={() => setExperimental(false)}
            name="model"
            id="standard"
          ></input>
          <p className="max-w-md text-balance text-center invisible group-hover:visible transition-all delay-150 duration-150">
            This model offers less thinking capabilities but is faster at
            reasoning and thinking.
          </p>
        </div>
      </form>
    </>
  );
}
