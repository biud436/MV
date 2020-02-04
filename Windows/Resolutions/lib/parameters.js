var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenManager>');
});

parameters = (parameters.length > 0) && parameters[0].parameters;

export default parameters;