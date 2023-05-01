import React, { useState } from "react";
import Chats from "./list-chat";
import Friends from "./list-friend";
import Groups from "./list-group";
import SidebarMenu from "./sidebar-menu";

interface SidebarProps {
  onGroupClick: (groupName: string, isprivate: any) => void; // Update the type of onGroupClick
  selectedGroup: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onGroupClick, selectedGroup }) => {
  const [currentPage, setPage] = useState("all-chats");

  return (
    <>
      <SidebarMenu setPage={setPage} currentPage={currentPage} />
      {(() => {
        switch (currentPage) {
          case "friends":
            return (
              <Friends
                onGroupClick={onGroupClick}
                selectedFriend={selectedGroup}
              />
            );
          case "groups":
            return (
              <Groups
                onGroupClick={onGroupClick}
                selectedGroup={selectedGroup}
              />
            );
          case "all-chats":
            return (
              <Chats
                onGroupClick={onGroupClick}
                selectedGroup={selectedGroup}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Sidebar;
