import * as React from 'react';
import * as Recoil from 'recoil';
import styled from 'styled-components';

import { currentTask } from 'web/atoms/current_task.atom';
import { TasklistAtom } from 'web/atoms/Tasklist.atom';
import { useTasklist } from 'web/hooks/useTasklist';

const SharedStyles = `box-sizing: border-box;
font-family: 'Open Sans', sans-serif;

padding: 4px 6px 3px;

  width: 100%;

  @media (min-width: 970px) {
    width: 500px;
  }
`;

const StyledContainer = styled.div`
position: relative;
display: inline-block;
`;

const StyledInput = styled.input`
  border: 1px solid #E4E4E4;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  ${SharedStyles}
`;

const StyledDiv = styled.div`
position: absolute;
top: 0;
left: 0;
border: 1px solid rgba(0,0,0,0);
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
${SharedStyles}
pointer-events: none;
  user-select: none;
  color: #e6e6e6
`;

const HiddenSpan = styled.span`
color: rgba(0,0,0,0);
`;

type AutoCompleteProps = {
  currentValue: string;
  matchingValue: string;
};

const AutoComplete = ({ currentValue, matchingValue }: AutoCompleteProps) => {
  const [shown, setShown] = React.useState('');
  const [hidden, setHidden] = React.useState('');

  React.useEffect(() => {
    if (matchingValue.length === 0) {
      setShown('');
      setHidden('');
      return;
    }

    setHidden(currentValue);
    setShown(matchingValue.substring(currentValue.length));
  }, [currentValue, matchingValue]);

  return <StyledDiv><HiddenSpan>{hidden}</HiddenSpan>{shown}</StyledDiv>;
};

export const TaskInput = () => {
  const [task, setTask] = Recoil.useRecoilState(currentTask);
  const resetTask = Recoil.useResetRecoilState(currentTask);
  const wholeTaskList = Recoil.useRecoilValue(TasklistAtom);
  const { addTask } = useTasklist();
  const [autoComplete, setAutoComplete] = React.useState('');

  const descriptions: string[] = React.useMemo(() => Object.keys(wholeTaskList).reduce<string[]>((descriptions, taskKey) => {
    const task = wholeTaskList[Number.parseInt(taskKey, 10)];
    return (task.done === false)
      ? [...descriptions, task.description]
      : descriptions;
  }, []), [wholeTaskList]);

  React.useEffect(() => {
    if (task.description.length === 0 ) {
      setAutoComplete('');
      return;
    }
    const found = descriptions.find(description => description.startsWith(task.description));
    if (found == null) {
      setAutoComplete('');
      return;
    }
    setAutoComplete(found);
  }, [task, descriptions]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setTask({ ...task, description: event.target.value });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key || event.keyCode;
    
    switch (key) {
      case 'Enter':
      case 13:
        addTask();
        resetTask();
        break;
      case 'Tab':
      case 9: {
        if (autoComplete.length === 0) {
          return;
        }

        event.preventDefault();
        const splitAutocomplete = autoComplete.substring(task.description.length).split(' ');
        const remainingPartOfFirstWord = (splitAutocomplete.length > 1)
          ? `${splitAutocomplete[0]} `
          : splitAutocomplete[0];

        setTask({ ...task, description: `${task.description}${remainingPartOfFirstWord}` });
        break;
      }
    }
  };

  return <StyledContainer>
    <StyledInput type="text" value={task.description} onChange={onChange} onKeyDown={onKeyDown} />
    <AutoComplete currentValue={task.description} matchingValue={autoComplete}/>
  </StyledContainer>;
};
