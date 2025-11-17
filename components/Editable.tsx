
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../App';

interface EditableProps {
  value: string;
  fieldPath: string;
  as?: 'textarea' | 'input';
  className?: string;
  style?: React.CSSProperties;
  tag?: React.ElementType;
}

const Editable: React.FC<EditableProps> = ({ value, fieldPath, as = 'input', className, tag: Tag = 'span', style }) => {
  const context = useContext(AppContext);
  const [isEditingThis, setIsEditingThis] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditingThis) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditingThis]);
  
  const { isAdmin, isEditing, lang, updateData } = context || {};
  
  if (!isAdmin || !isEditing) {
    return <Tag className={className} style={style}>{value}</Tag>;
  }

  const handleSave = () => {
    if (inputValue !== value) {
      updateData?.(fieldPath, inputValue);
    }
    setIsEditingThis(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && as === 'input' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setInputValue(value);
      setIsEditingThis(false);
    }
  };

  if (isEditingThis) {
    const commonProps = {
      ref: inputRef as any,
      value: inputValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInputValue(e.target.value),
      onBlur: handleSave,
      onKeyDown: handleKeyDown,
      className: `bg-teal-700 p-1 rounded-md border-2 border-cyan-500 w-full diwani-input ${className}`,
      style,
    };

    return as === 'textarea'
      ? <textarea {...commonProps} rows={Math.max(3, inputValue.split('\n').length)} />
      : <input type="text" {...commonProps} />;
  }
  
  return (
    <Tag
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditingThis(true); }}
      className={`outline-dashed outline-1 outline-transparent hover:outline-cyan-500/50 cursor-pointer hover:bg-cyan-500/10 p-1 -m-1 rounded-sm transition-all duration-200 ${className}`}
      title="Click to edit"
      style={style}
    >
      {value || (lang === 'ar' ? 'أضف قيمة...' : 'Add value...')}
    </Tag>
  );
};

export default Editable;