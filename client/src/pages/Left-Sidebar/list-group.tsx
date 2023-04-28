import React, { useState, MouseEvent } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Group {
  groupName: string;
  people: number;
}

interface ChatGroupsProps {
  onGroupClick: (groupName: string) => void;
  selectedGroup: string;
}

const groupListDefault: Group[] = [
  {
    groupName: "Someone",
    people: 1,
  },
  {
    groupName: "Someone Else",
    people: 1,
  },
  // Add more group list items here
];

const Groups: React.FC<ChatGroupsProps> = ({ onGroupClick, selectedGroup }) => {
  const [message, setMessage] = useState("");
  const [groupList, setGroupList] = useState<Group[]>(groupListDefault); // TODO: Replace with actual group list from server
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };
  const createGroupHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setGroupList((prevGroupList) => {
      return [
        ...prevGroupList,
        {
          groupName: message,
          people: 1,
        },
      ];
    });
    setMessage("");
  };
  return (
    <div className="bg-bgColor w-1/3 border-r border-borderColor">
      <div className="h-35 w-full border-b border-borderColor items-center flex justify-center flex-col">
        <div className="w-4/5">
          <div className="w-full flex items-center relative mt-4">
            <input
              type="text"
              className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white"
              placeholder="Search"
              name="search_user"
            />
            <div className="absolute right-0 top-0 h-full w-10 text-center text-gray-400 pointer-events-none flex items-center justify-center">
              <MagnifyingGlassIcon className="h-6 w-6 text-fontBgColor" />
            </div>
          </div>
        </div>
        <div className="w-11/12 items-center flex justify-center">
          <input
            id="message"
            onChange={handleChange}
            value={message}
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white mt-3 mb-4"
            placeholder="Enter Group Name"
            name="group_name"
          />
          <button
            type="button"
            name="all-chats"
            className="w-20 h-12 rounded-xl text-white ml-2 bg-purple"
            onClick={createGroupHandler}
          >
            Create
          </button>
        </div>
      </div>
      {groupList.map((group, index) => (
        <div
          key={index}
          className={`h-28 w-full border-b border-borderColor items-center flex cursor-pointer ${
            group.groupName === selectedGroup ? "bg-purple-400" : ""
          }`}
          onClick={() => {
            onGroupClick(group.groupName);
            console.log(group.groupName);
          }}
        >
          <Image
            src="/Frame_8.png"
            alt=""
            width={75}
            height={50}
            className="ml-6"
          ></Image>
          <div className="font-roboto ml-6">
            <p
              className={`text-white text-xl ${
                group.groupName === selectedGroup ? "font-bold" : ""
              }`}
            >
              {`${group.groupName} (${group.people})`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Groups;
