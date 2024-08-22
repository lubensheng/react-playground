import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./index.module.less";

interface ViewProps {
  content: string;
  type: "error" | "warn";
}

function ErrorMessage(props: ViewProps) {
  const { content, type } = props;
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    if (content) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [content]);
  return visible ? (
    <div className={classNames(styles['msg'], styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles['dismiss']} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  ) : null;
}

export default ErrorMessage;
