import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Join = () => {
  const history = useHistory();
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/chat",
      state: {
        user: {
          name: capitilizeString(name),
          gender: gender,
        },
      },
    });
  };

  const capitilizeString = (value) => {
    value = value.split(" ");
    value.map(
      (str, index) => (value[index] = str[0].toUpperCase() + str.slice(1))
    );
    return value.join(" ");
  };

  return (
    <section
      class="text-gray-700 body-font  h-screen"
      style={{
        background: `url('https://source.unsplash.com/${window.screen.width}x${window.screen.height}/?nature,water,evening')`,
      }}>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap justify-center">
          <div class="p-4 lg:w-1/3">
            <div class="h-full bg-gray-200 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative shadow">
              <form onSubmit={onSubmitForm}>
                <label class="block">
                  <span class="text-gray-900 text-lg font-medium">
                    Your Good Name
                  </span>
                  <input
                    onInput={(e) => {
                      setName(e.target.value);
                    }}
                    class="form-input mt-2 block w-full p-2 outline-none"
                    placeholder="Enter name"
                    required
                  />
                </label>

                <div class="mt-4">
                  <span class="text-gray-900 text-lg font-medium">Gender</span>
                  <div class="mt-2">
                    <label class="inline-flex items-center">
                      <input
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        type="radio"
                        class="form-radio text-blue-500"
                        name="gender"
                        value="male"
                        required
                      />
                      <span class="ml-2">Male</span>
                    </label>
                    <label class="inline-flex items-center ml-6">
                      <input
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        type="radio"
                        class="form-radio text-blue-500"
                        name="gender"
                        value="female"
                        required
                      />
                      <span class="ml-2">Female</span>
                    </label>
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="submit"
                    class="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg">
                    Explore
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Join;
