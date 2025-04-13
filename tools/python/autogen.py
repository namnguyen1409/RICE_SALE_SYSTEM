data = ["advancedMode",
        "customPresets",
        "themeMode",
        "colorPrimary",
        "colorPrimaryBg",
        "colorPrimaryBgHover",
        "colorPrimaryBorder",
        "colorPrimaryBorderHover",
        "colorPrimaryHover",
        "colorPrimaryActive",
        "colorPrimaryTextHover",
        "colorPrimaryText",
        "colorPrimaryTextActive",
        "colorSuccess",
        "colorSuccessBg",
        "colorSuccessBgHover",
        "colorSuccessBorder",
        "colorSuccessBorderHover",
        "colorSuccessHover",
        "colorSuccessActive",
        "colorSuccessTextHover",
        "colorSuccessText",
        "colorSuccessTextActive",
        "colorWarning",
        "colorWarningBg",
        "colorWarningBgHover",
        "colorWarningBorder",
        "colorWarningBorderHover",
        "colorWarningHover",
        "colorWarningActive",
        "colorWarningTextHover",
        "colorWarningText",
        "colorWarningTextActive",
        "colorError",
        "colorErrorBg",
        "colorErrorBgHover",
        "colorErrorBorder",
        "colorErrorBorderHover",
        "colorErrorHover",
        "colorErrorActive",
        "colorErrorTextHover",
        "colorErrorText",
        "colorErrorTextActive",
        "colorLink",
        "colorLinkHover",
        "colorLinkActive",
        "colorTextBase",
        "colorBgBase",
        "colorText",
        "colorTextSecondary",
        "colorTextTertiary",
        "colorTextQuaternary",
        "colorBorder",
        "colorBorderSecondary",
        "colorFill",
        "colorFillSecondary",
        "colorFillTertiary",
        "colorFillQuaternary",
        "colorBgContainer",
        "colorBgElevated",
        "colorBgLayout",
        "colorBgSpotlight",
        "colorBgMask",
        "sizeMode",
        "fontSizeSM",
        "fontSizeLG",
        "fontSizeXL",
        "fontSizeHeading1",
        "fontSizeHeading2",
        "fontSizeHeading3",
        "fontSizeHeading4",
        "fontSizeHeading5",
        "lineHeight",
        "lineHeightSM",
        "lineHeightLG",
        "lineHeightHeading1",
        "lineHeightHeading2",
        "lineHeightHeading3",
        "lineHeightHeading4",
        "lineHeightHeading5",
        "sizeStep",
        "sizeUnit",
        "marginXXS",
        "marginXS",
        "marginSM",
        "margin",
        "marginMD",
        "marginLG",
        "marginXL",
        "marginXXL",
        "paddingXXS",
        "paddingXS",
        "paddingSM",
        "padding",
        "paddingMD",
        "paddingLG",
        "paddingXL",
        "borderRadius",
        "borderRadiusXS",
        "borderRadiusSM",
        "borderRadiusLG",
        "boxShadow",
        "boxShadowSecondary",
        "wireframe",
        "fontSize",
        "fontFamily"]

def gen_temp():

    _list = []

    for i in data:
        # uppercase the first letter of each word
        upper = i[0].upper() + i[1:]
        _list.append(
            f"  const [temp{upper}, setTemp{upper}] = useState(token.{i});"
        )

    with open("text.txt", "w") as f:
        for i in _list:
            f.write(i + "\n")

maptemplate = open("maptemplate.txt", "r", encoding="utf-8").read()

def gen_maptoken():
    _list = []

    for i in data:
        # uppercase the first letter of each word
        upper = i[0].upper() + i[1:]
        _list.append(
            maptemplate.replace("{{name}}", i).replace("{{upper}}", upper)
        )

    with open("text.txt", "w") as f:
        for i in _list:
            f.write(i + "\n")

if __name__ == "__main__":
    # gen_temp()
    gen_maptoken()