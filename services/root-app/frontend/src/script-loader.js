
const scriptLoader = (url) => {
  return new Promise((resolve, reject) => {
    const scriptTagRef = document.getElementsByTagName('script')[0];
    const newScriptTag = document.createElement('script');
  
    newScriptTag.onload = resolve;
    newScriptTag.error = reject;

    newScriptTag.src = url;

    scriptTagRef.parentNode.appendChild(newScriptTag);

  });
};

export default scriptLoader;
