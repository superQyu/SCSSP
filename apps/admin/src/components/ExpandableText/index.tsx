
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  className?: string;
  expandText?: string;
  collapseText?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLines = 2,
  className = '',
  expandText = '展开',
  collapseText = '收起',
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (textRef.current) {
      setTimeout(() => {
        const { scrollHeight, clientHeight } = textRef.current;
        setShowToggle(scrollHeight > clientHeight);
      }, 10);
    }
  }, [text, maxLines]);

  // 处理展开/收起点击事件
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={textRef}
        className={`${!expanded && 'line-clamp-' + maxLines} transition-all duration-300`}
        style={{
          maxHeight: !expanded ? `${maxLines * 24}px` : 'none', // 每行约24px高度
          overflow: 'hidden',
        }}
      >
        {text}
      </div>
      {/* 仅在文本超出最大行数时显示切换按钮 */}
      {showToggle && (
        <Button
          type="link"
          size="small"
          onClick={handleToggle}
          className="absolute bottom-0 right-0 mt-1 text-primary"
          style={{ background: 'white', paddingLeft: 8 }}
        >
          {expanded ? collapseText : expandText}
        </Button>
      )}
    </div>
  );
};

export default ExpandableText;