const loadState = () => {
  try {
    const state = localStorage.getItem('state');
    if (!state) {
      return undefined;
    }
    return JSON.parse(state);
  } catch {
    return undefined;
  }
}

const saveState = (state) => {
  const newState = JSON.stringify(state);
  localStorage.setItem('state', newState);
}

export {
  loadState,
  saveState,
}