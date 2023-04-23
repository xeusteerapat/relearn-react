import { checklistLabel } from '../data/checklist-label';
import { mapLabel } from '../utils/mapLabel';

type Action = {
  type: string;
  payload?: any;
};

export const checklistReducer = (
  state = mapLabel(checklistLabel),
  action: Action
) => {
  switch (action.type) {
    case 'DEFAULT':
      console.log('state', action);
      return state;
    case 'APPLY':
      console.log('state', action);
      return action.payload.selectedOptions;
  }
};
