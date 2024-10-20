GorillaPresenter.isOnline = function () {
    if (navigator.onLine) {
        return true;
    } else {
        console.log("You are offline (navigator.onLine reports no connection).");
        return false;
    }
}