// 获取元素的位置
export default function offset(child, parent) {
  parent = parent || document.body;

  let [left, top] = [0, 0];

  while (child && child !== parent) {
    left += child.offsetLeft;
    top += child.offsetTop;
    child = child.offsetParent;
  }

  return { left, top };
}

