(async() => {
    const response = await fetch('/modules.json');
    const moduleList = await response.json();
    await Promise.all(moduleList.map(async (modulePath) => {
        return await import('/' + modulePath);
    }));
    await import('/main.js');
})();