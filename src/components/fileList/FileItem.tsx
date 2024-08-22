import classNames from "classnames";
import "./index.less";
import { useEffect, useRef, useState } from "react";

interface ViewProps {
  name: string;
  onActive: (name: string) => void;
  isActive: boolean;
  updateFileName: (newName: string, preName: string) => void;
  isCreating: boolean;
  canDelete: boolean;
  handleDelete: (fileName: string) => void;
}

function FileItem(props: ViewProps) {
  const { name, onActive, isActive, canDelete } = props;
  const [isClick, setIsClick] = useState<boolean>(false);
  const [value, setValue] = useState<string>(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    onActive(name);
    setIsClick(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (props.isCreating) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [props.isCreating]);

  const handleBlur = () => {
    setIsClick(false);
    props.updateFileName(value, name);
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className={classNames("tab_item", isActive ? "tab_item_actived" : null)}
    >
      {isClick ? (
        <input
          onBlur={handleBlur}
          value={value}
          ref={inputRef}
          className="tabs_item_input"
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <>
          <span>{value}</span>
          {canDelete && (
            <span
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                props.handleDelete(name);
              }}
            >
              -
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default FileItem;
