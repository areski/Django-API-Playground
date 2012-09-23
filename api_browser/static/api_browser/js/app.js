var APIBrowser = $.Class.extend({

    EMPTY_RESPONSE: "(EMPTY RESPONSE)",
    SLIDE_DURATION: 100,

    selectors: {
        endpoint_form : ".endpoint form",
        endpoint_anchor: ".endpoint a",
        try_it: ".try-it",
        request: ".request",
        code: "code",
        response_status: ".response-status",
        response_headers: ".response-headers",
        response_body: ".response-body",
        url_parameters: ".url-parameters input"
    },

    init: function () {
        this.load_rest_form();
        this.make_expandable(this.selectors.endpoint_anchor,
                            this.selectors.try_it, this.SLIDE_DURATION);
        this.fill_url_parameters(this.selectors.url_parameters, this.selectors.endpoint_form);
    },

    load_rest_form: function () {
        $(this.selectors.endpoint_form).restForm({
            "submit": this.submit_form.bind(this),
            "complete": this.complete_ajax_request.bind(this)
        });
    },

    "submit_form": function (form, request_headers) {
        form.siblings(this.selectors.request).show().
            find(this.selectors.code).html(request_headers.join("\n"));
    },

    "complete_ajax_request": function (form, xhr) {
        form.siblings(this.selectors.response_status).show().find(
            this.selectors.code).html(xhr.statusText + " (" + xhr.status + ")");

        form.siblings(this.selectors.response_headers).show().find(
            this.selectors.code).html(xhr.getAllResponseHeaders());

        form.siblings(this.selectors.response_body).show().find(
            this.selectors.code).text(xhr.responseText || this.EMPTY_RESPONSE);
    },

    make_expandable: function (click_element, show_element, slide_duration) {
        $(click_element).click(function () {
            $(this).siblings(show_element).slideToggle(slide_duration || "normal");
            return false;
        });
    },

    "fill_url_parameters": function (url_parameters, form_selector) {
        $(url_parameters).change(function () {
            var form = $(this).parents(form_selector);
            var rendered_url = form.data("endpoint-url").replace(
                $(this).data("token"), $(this).val());
            form.attr("action", rendered_url)
        })
    }

});