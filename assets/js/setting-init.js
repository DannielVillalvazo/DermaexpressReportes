(function () {
    ("use strict");
    // Customizer Setting initialize
    let setting_options = document.querySelector('meta[name="setting_options"]');
    if (setting_options !== null && setting_options !== undefined) {
        setting_options = JSON.parse(setting_options.getAttribute("content"));
    } else {
        setting_options = JSON.parse("{}");
    }

    const theme = IQUtils.getQueryString('theme')
    setting_options = selectTheme('0')

    if(theme !== '' && theme !== null) {
        setting_options = selectTheme(theme)
    }

    document.addEventListener('sidebar_show', function (value) {
        const sidebar = document.querySelector('[data-toggle="main-sidebar"]')
        if (value.detail.value.length > 0) {
            sidebar.classList.remove('sidebar')
        } else {
            if (!sidebar.classList.contains('sidebar')) {
                sidebar.classList.add('sidebar')
            }
        }
    })

    const setting = (window.IQSetting = new IQSetting(setting_options));

    // Sidebar type event listener
    $(document).on("sidebar_type", function (e) {
        if (typeof setting !== typeof undefined) {
        const sidebarType = setting.options.setting.sidebar_type.value;
        if(e.detail.value.length !== 0) {
            if(e.detail.currentValue !== 'sidebar-mini' && e.detail.currentValue !== '') {
            if (sidebarType.includes("sidebar-hover") && !e.detail.value.includes("sidebar-mini")) {
                const newTypes = sidebarType;
                newTypes.push("sidebar-mini");
                setting.sidebar_type(newTypes);
            }
            }
        }
        }
    });

    // navbar style event listener
    $(document).on("header_navbar", function () {
        if (typeof setting !== typeof undefined) {
        const headerNavbar = setting.options.setting.header_navbar;
        if (headerNavbar.value == "nav-glass") {
            $(headerNavbar.target).addClass("navs-sticky");
        }
        }
    });
    document.addEventListener('click', function(e) {
        const liveCustomizerPannel = document.querySelector('#live-customizer')
        if(liveCustomizerPannel !== null) {
        if(liveCustomizerPannel.classList.contains('show')) {
            if(e.target.closest('.live-customizer') == null && e.target.closest('#settingbutton') == null) {
            bootstrap.Offcanvas.getInstance(liveCustomizerPannel).hide()
            }
        }
        }
    })

    const liveCusomizer = IQUtils.getQueryString('live-customizer')
    if(liveCusomizer !== '' && liveCusomizer !== null && liveCusomizer === 'open') {
        const liveCustomizerPannel = document.querySelector('#live-customizer')
        const liveCustomizerInstance = new bootstrap.Offcanvas(liveCustomizerPannel)
        if(liveCustomizerInstance !== null) {
        liveCustomizerInstance.show()
        }
    }

    /*---------------------------------------------------------------------
                Reset Settings
    -----------------------------------------------------------------------*/
    const resetSettings = document.querySelector('[data-reset="settings"]');
    if(resetSettings !== null){
        resetSettings.addEventListener('click', (e) => {
            e.preventDefault();
            const confirm = window.confirm('Are you sure you want to reset your settings?');
            if (confirm) {
                window.IQSetting.reInit()
            }
        })
    }

    /*---------------------------------------------------------------------
                Copy Json
    -----------------------------------------------------------------------*/
    const copySettings = document.querySelector('[data-copy="settings"]');
    if(copySettings !== null) {
        copySettings.addEventListener('click', (e) => {
            e.preventDefault();
            let settingJson = window.IQSetting.getSettingJson()
            const elem = document.createElement("textarea");
            document.querySelector("body").appendChild(elem);
            elem.value = settingJson;
            elem.select();
            document.execCommand("copy");
            elem.remove();
            copySettings.setAttribute('data-bs-original-title', 'Copied!');
            let btn_tooltip = bootstrap.Tooltip.getInstance(copySettings);
            btn_tooltip.show();
            // reset the tooltip title
            copySettings.setAttribute('data-bs-original-title', 'Copy to clipboard');
            setTimeout(() => {
                btn_tooltip.hide();
            }, 500)
        })
    }

    function selectTheme(theme) {
        switch (theme) {
        case '0':
            return {
            "setting": { 
                    "app_name": {
                        "target": "[data-setting=\"app_name\"]",
                            "type": "text",
                                "value": "DExpress"
                    },
                    "theme_scheme_direction": {
                        "target": "html",
                            "choices": [
                                "ltr",
                                "rtl"
                            ],
                                "value": "ltr"
                    },
                    "theme_scheme": {
                        "target": "body",
                            "choices": [
                                "light",
                                "dark",
                                "auto"
                            ],
                                "value": "light"
                    },
                    "theme_style_appearance": {
                        "target": "body",
                            "choices": [
                                "theme-default",
                                "theme-flat",
                                "theme-bordered",
                                "theme-sharp"
                            ],
                                "value": [
                                    "theme-default"
                                ]
                    },
                    "theme_color": {
                        "target": "body",
                            "choices": [
                                "theme-color-blue",
                                "theme-color-gray",
                                "theme-color-red",
                                "theme-color-yellow",
                                "theme-color-pink",
                                "theme-color-default"
                            ],
                                "type": "variable",
                                    "colors": {
                            "--{{prefix}}primary": "#EA6A12",
                                "--{{prefix}}info": "#6410F1"
                        },
                        "value": "theme-color-yellow"
                    },
                    "theme_transition": {
                        "target": "body",
                            "choices": [
                                "theme-without-animation",
                                "theme-with-animation"
                            ],
                                "value": "theme-with-animation"
                    },
                    "theme_font_size": {
                        "target": "html",
                            "choices": [
                                "theme-fs-sm",
                                "theme-fs-md",
                                "theme-fs-lg"
                            ],
                                "value": "theme-fs-md"
                    },
                    "page_layout": {
                        "target": "#page_layout",
                            "choices": [
                                "container",
                                "container-fluid"
                            ],
                                "value": "container-fluid"
                    },
                    "header_navbar_show": {
                        "target": ".iq-navbar",
                            "choices": [
                                "iq-navbar-none"
                            ],
                                "value": []
                    },
                    "header_navbar": {
                        "target": ".iq-navbar",
                            "choices": [
                                "default",
                                "fixed",
                                "navs-sticky",
                                "nav-glass",
                                "navs-transparent",
                                "boxed",
                                "hidden"
                            ],
                                "value": "default"
                    },
                    "header_banner": {
                        "target": ".iq-banner",
                            "choices": [
                                "default",
                                "navs-bg-color",
                                "hide"
                            ],
                                "value": "default"
                    },
                    "card_color": {
                        "target": "body",
                            "choices": [
                                "card-default",
                                "card-glass",
                                "card-transparent"
                            ],
                                "value": "card-default"
                    },
                    "sidebar_show": {
                        "target": "[data-toggle=\"main-sidebar\"]",
                            "choices": [
                                "sidebar-none"
                            ],
                                "value": []
                    },
                    "sidebar_color": {
                        "target": "[data-toggle=\"main-sidebar\"]",
                            "choices": [
                                "sidebar-white",
                                "sidebar-dark",
                                "sidebar-color",
                                "sidebar-transparent",
                                "sidebar-glass"
                            ],
                                "value": "sidebar-white"
                    },
                    "sidebar_type": {
                        "target": "[data-toggle=\"main-sidebar\"]",
                            "choices": [
                                "sidebar-hover",
                                "sidebar-mini",
                                "sidebar-boxed",
                                "sidebar-soft"
                            ],
                                "value": []
                    },
                    "sidebar_menu_style": {
                        "target": "[data-toggle=\"main-sidebar\"]",
                            "choices": [
                                "sidebar-default navs-rounded",
                                "sidebar-default navs-rounded-all",
                                "sidebar-default navs-pill",
                                "sidebar-default navs-pill-all",
                                "left-bordered",
                                "sidebar-default navs-full-width"
                            ],
                                "value": "left-bordered"
                    },
                    "footer": {
                        "target": ".footer",
                            "choices": [
                                "sticky",
                                "default",
                                "glass"
                            ],
                                "value": "default"
                    },
                    "body_font_family": {
                        "target": "body",
                            "type": "variable",
                                "value": null
                    },
                    "heading_font_family": {
                        "target": "heading",
                            "type": "variable",
                                "value": null
                    } 
            }
        }
        break;
        case '1':
            return {
            "setting": {
                "app_name": {
                    "value": "Hope UI"
                },
                "theme_scheme_direction": {
                    "value": "ltr"
                },
                "theme_scheme": {
                    "value": "light"
                },
                "theme_style_appearance": {
                    "value": []
                },
                "theme_color": {
                    "colors": {
                        "--{{prefix}}primary": "#22b4b2",
                        "--{{prefix}}info": "#45494f"
                    },
                    "value": "custom"
                },
                "theme_transition": {
                    "value": null
                },
                "theme_font_size": {
                    "value": "theme-fs-md"
                },
                "page_layout": {
                    "value": "container-fluid"
                },
                "header_navbar": {
                    "value": "navs-default"
                },
                "header_banner": {
                    "value": "default"
                },
                "sidebar_color": {
                    "value": "sidebar-dark"
                },
                "sidebar_type": {
                    "value": [
                        "sidebar-boxed"
                    ]
                },
                "sidebar_menu_style": {
                    "value": "navs-pill"
                },
                "footer": {
                    "value": "default"
                },
                "body_font_family": {
                    "value": null
                },
                "heading_font_family": {
                    "value": null
                }
            }
        }
        break;
        case '2':
            return {
            "setting": {
                "app_name": {
                    "value": "Hope UI"
                },
                "theme_scheme_direction": {
                    "value": "ltr"
                },
                "theme_scheme": {
                    "value": "light"
                },
                "theme_style_appearance": {
                    "value": [
                        "theme-default"
                    ]
                },
                "theme_color": {
                    "colors": {
                        "--{{prefix}}primary": "#b56be6",
                        "--{{prefix}}info": "#25C799"
                    },
                    "value": "custom"
                },
                "theme_transition": {
                    "value": null
                },
                "theme_font_size": {
                    "value": "theme-fs-md"
                },
                "page_layout": {
                    "value": "container-fluid"
                },
                "header_navbar": {
                    "value": "navs-default"
                },
                "header_banner": {
                    "value": "default"
                },
                "sidebar_color": {
                    "value": "sidebar-color"
                },
                "sidebar_type": {
                    "value": [
                        "sidebar-boxed"
                    ]
                },
                "sidebar_menu_style": {
                    "value": "navs-rounded-all"
                },
                "footer": {
                    "value": "default"
                },
                "body_font_family": {
                    "value": null
                },
                "heading_font_family": {
                    "value": null
                }
            }
        }
        break;
        }
    }

    /*---------------------------------------------------------------------
                Logo & Font Change Functionality Preview purpose only based on user selected file
    -----------------------------------------------------------------------*/

    // function for get google font api https://www.googleapis.com/webfonts/v1/webfonts?key=
    let fontList
    let apiCall = false
    let api = document.querySelector('meta[name="google_font_api"]').getAttribute('content')
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${api}&sort=popularity`;
    function getGoogleFonts(){
        fetch(url).then(response => response.json())
        .then(data => {
            apiCall = true
            // select2 options add
            fontList = data.items.map(font => {
                return {
                    id: font.family,
                    text: font.family,
                }
            })
            $('[data-select="font"]').select2({
                data: fontList
            })
        })
    }
    $('#settingbutton').on('click', function (e) {
        if(!apiCall) {
            getGoogleFonts()
        }
    })

})();
