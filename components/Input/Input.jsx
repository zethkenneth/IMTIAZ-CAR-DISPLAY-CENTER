/**
 *
 * @param {object} props - options needed for input desing and functionality
 * @returns {component} : Instance of Input created for reusability
 */
const Input = (props) => {
  if (props.type === "dropdown") {
    return (
      <>
        <label
          for={props.name}
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          {props.label}
        </label>
        <select w="10em">
          <option label="Test" value={"Test1"} />
        </select>
      </>
    );
  }
  return (
    <>
      <div class="flex items-center justify-between">
        <label
          for={props.name}
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          {props.label}
        </label>
      </div>
      <div
        className={`${
          props.icon ? "flex items-center gap-3 border 3" : "shadow-sm"
        } bg-red p-1 rounded-md`}
      >
        {props.icon && props.icon}
        <input
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          type={props.name === "password" ? props.name : "text"}
          autoComplete="current-password"
          onChange={(e) => props.onChange(e.target.value)}
          required
          className={`block w-full rounded-md py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
            props.icon
              ? "border-none ring-0 focus:ring-0"
              : "border ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          }`}
        />
      </div>
    </>
  );
};

export default Input;
