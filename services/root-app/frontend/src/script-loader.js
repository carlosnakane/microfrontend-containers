
const scriptLoader = (url) => {
  return new Promise((resolve, reject) => {
    const scriptTagRef = document.getElementsByName('script')[0];
    const newScriptTag = document.createElement('script');
  
    scriptTagRef.parentNode.appendChild(newScriptTag);
  
    newScriptTag.onload = resolve;
    newScriptTag.error = reject;

    newScriptTag.src;

  });
};

export default scriptLoader;
