var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ArabicNameEdit>');
});

parameters = (parameters.length > 0) && parameters[0].parameters;

export default parameters;