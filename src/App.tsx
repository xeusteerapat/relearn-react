import { useState } from 'react';
import { defaultChecklist } from './data/checklist';
import { Modal, Checkbox, Row, Col, Button, Collapse } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { checklistLabel } from './data/checklist-label';
import { convertLabelToValue, mapLabel } from './utils/mapLabel';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useReducer } from 'react';
import { checklistReducer } from './reducers/checklistReducers';

const CheckboxGroup = Checkbox.Group;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedOptions, setSelectedOptions] = useState<CheckboxValueType[]>(
    mapLabel(checklistLabel)
  );
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(true);
  const [isCompleted, setIsCompleted] = useState(true);
  const [options, dispatch] = useReducer(
    checklistReducer,
    mapLabel(checklistLabel)
  );

  const onChange = (list: CheckboxValueType[]) => {
    setSelectedOptions(list);
    setIndeterminate(
      !!list.length && list.length < mapLabel(checklistLabel).length
    );
    setCheckAll(list.length === mapLabel(checklistLabel).length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setSelectedOptions(e.target.checked ? mapLabel(checklistLabel) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleSetDefault = () => {
    dispatch({
      type: 'DEFAULT',
    });
    setSelectedOptions(mapLabel(checklistLabel));
    setIndeterminate(false);
    setCheckAll(true);
    setIsCompleted(true);
  };

  const handleApply = () => {
    dispatch({
      type: 'APPLY',
      payload: {
        selectedOptions,
      },
    });
    setIsModalOpen(false);
  };

  const handleShowComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const renderChecklist = defaultChecklist
    .filter(item => {
      return convertLabelToValue(options).includes(item.timeBeforeDays);
    })
    .map(item => {
      const completedTasks = item.planners.filter(planner => !planner.complete);

      if (!isCompleted) {
        return {
          ...item,
          planners: [...completedTasks],
        };
      }

      return item;
    })
    .filter(item => item.planners.length !== 0);

  return (
    <div
      style={{
        display: 'flex',
        padding: '2rem',
      }}
    >
      <div>
        <h1>Hello</h1>
        <button onClick={showModal}>Filters</button>
        <Modal
          title='Basic Modal'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key='back' onClick={handleSetDefault}>
              Default
            </Button>,
            <Button key='submit' type='primary' onClick={handleApply}>
              Apply
            </Button>,
          ]}
        >
          <Col>
            <Row>
              <Checkbox checked={isCompleted} onChange={handleShowComplete}>
                Show completed
              </Checkbox>
            </Row>
            <Row>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                All
              </Checkbox>
            </Row>
            <Row>
              <Col span={8}>
                <CheckboxGroup
                  options={mapLabel(checklistLabel)}
                  value={selectedOptions}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Col>
        </Modal>
        {/* <pre>{JSON.stringify(renderChecklist, null, 2)}</pre> */}
        <Collapse accordion>
          {renderChecklist.map(checklist => (
            <Collapse.Panel
              key={checklist.timeBeforeDays}
              header={`${checklist.timeBefore} months`}
            >
              {checklist.planners.map(planner => (
                <Checkbox key={planner.id} checked={planner.complete}>
                  {planner.title}
                </Checkbox>
              ))}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}

export default App;
