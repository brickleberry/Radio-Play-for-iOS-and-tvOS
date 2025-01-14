/*
Copyright (C) 2017 Radiomyme. All Rights Reserved.

*/
/**
 * @description This function sets the class BASEURL attribute
 * @param {String} baseurl - The base URL for the app
 * @throws Exception - If no baseurl argument is provided
 */
function ResourceLoader(baseurl) {
    if (!baseurl) {
        throw("ResourceLoader: baseurl is required.");
    }

    this.BASEURL = baseurl;
}

/**
 * @description This function loads a resource then invokes the callback
 * @param {String} resource - The URL to a JavaScript file
 * @param {Function} callback - The callback to invoke after successfully loading the resource
 */
ResourceLoader.prototype.loadResource = function(resource, callback) {
    var self = this;

    /**
     * evaluateScripts is responsible for loading the JavaScript files neccessary
     * for you app to run. It can be used at any time in your apps lifecycle. In 
     * this implementation we are using evaluate scripts to load and evaluate
     * template files saved as JavaScript string templates.
     * 
     * @param - Array of JavaScript URLs  
     * @param - Function called when the scripts have been evaluated. A boolean is
     * passed that indicates if the scripts were evaluated successfully.
     */
    evaluateScripts([resource], function(success) {
        if (success) {
            var resource = Template.call(self, myVideoDictionary);
            callback.call(self, resource);
        } else {
            var title = "Resource Loader Error",
                description = `There was an error attempting to load the resource '${resource}'. \n\n Please try again later.`,
                alert = createAlert(title, description);

            Presenter.removeLoadingIndicator();
            
            navigationDocument.presentModal(alert);
        }
    });
}
