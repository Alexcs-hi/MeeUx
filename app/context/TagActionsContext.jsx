"use client";

import { createContext, useContext, useState } from "react";

const TagActionContext = createContext(null);

export function TagActionsProvider({ children }) {
  const [tagListVisible, setTagListVisible] = useState(false);
  const [tagSelectVisible, setTagSelectVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedPost, setSelectedPost] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <TagActionContext.Provider
      value={{
        tagListVisible,
        setTagListVisible,
        selectedTag,
        setSelectedTag,
        tagSelectVisible,
        setTagSelectVisible,
        selectedPost,
        setSelectedPost,
        isFullScreen,
        setIsFullScreen,
      }}>
      {children}
    </TagActionContext.Provider>
  );
}

export const useTagActions = () => useContext(TagActionContext);
