async function ServiceProvider(req, res) {
    try {
        res.send("service worker started");
    }
    catch (e) {
        console.log(e);
    }
}
export { ServiceProvider };