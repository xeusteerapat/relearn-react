export const mapLabel = (labelList: number[]) => {
  return labelList.map(item => {
    const month = Math.floor(item / 30);
    return month === 12
      ? `${12}+ months`
      : month === 1
      ? `${month} month`
      : month === 0
      ? `1 week`
      : `${month} months`;
  });
};

export const convertLabelToValue = (checkListWithLabel: string[]) => {
  return checkListWithLabel.map(item => {
    return item === '1 week'
      ? 7
      : Number(item.split(' ')[0].replace('+', '')) * 30;
  });
};
