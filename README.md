## 主要收集自用的package，未经验证过，但看起来有可玩性的也会收录，但会标明
[软件主要来源](https://github.com/kiddin9/openwrt-packages/)（为了方便，这里有的我就不会从源仓库获取，而且kiddin9大佬有些还打了补丁）

### 备注
有些开源软件，作者开发时并未留下个人信息，故来源可能弄错，若错了，请同志们帮忙指正！

-------------------------------
### 插件说明
[Markdown表格生成工具](https://www.tablesgenerator.com/markdown_tables#)
| 序号 |         目录         | 插件名称                                                           | 插件说明                                                                               | 作者                                                     | 备注 |
|:----:|:--------------------:|-------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------|------|
|   1  |       Gecoosac       | ```gecoosac``` <br> ```luci-app-gecoosac```                                                                                                                                                                                                                                                                                                                 | 集客无线AC控制器                                                                            | [lwb1978](https://github.com/lwb1978/openwrt-gecoosac)  |      |
|   2  |   5G-Modem-Support   | ```fibocom-dial ``` <br> ```fibocom_QMI_WWAN``` <br> ```luci-app-cpe ``` <br> ```luci-app-gobinetmodem``` <br> ```luci-app-hypermodem ``` <br> ```luci-app-modem``` <br> ```luci-app-pcimodem ``` <br> ```luci-app-sms-tool``` <br> ```luci-app-spdmodem ``` <br> ```luci-app-usbmodem``` <br> ```quectel_Gobinet ``` <br> ```quectel_MHI``` <br> ```quectel_QMI_WWAN ``` <br> ```quectel_SRPD_PCIE``` <br> ```quectel_cm_5G ``` <br> ```sendat sms-tool``` | 5G模块支持 [详细说明](https://github.com/Siriling/5G-Modem-Support/blob/main/README.md) <li>5G驱动 <br>  ```quectel_Gobinet quectel_MHI``` <br> ```quectel_QMI_WWAN quectel_SRPD_PCIE``` <br> ```fibocom_MHI fibocom_QMI_WWAN ``` <br>  <li>拨号工具 <br>  ```quectel_cm_5G fibocom-dial``` <br>  <li>图形化界面设置 <br>    - 拨号 <br>    ```luci-app-modem（新） luci-app-hypermodem``` <br> ```luci-app-usbmodem luci-app-pcimodem``` <br> ```luci-app-gobinetmodem luci-app-spdmodem``` <br>    - 简化版信息插件<br>    ```luci-app-cpe``` <br>    - AT命令工具<br>    ```sendat sms-tool``` <br>    - 短信工具<br>    ```luci-app-sms-tool``` <br> | [Siriling](https://github.com/Siriling/5G-Modem-Support) |      |
|   3  | Accesscontrol|```luci-app-accesscontrol-plus``` <br> ```luci-app-timecontrol```| <li>精准控制网络设备上网时间 [详细说明](https://github.com/kingyond/luci-app-accesscontrol-plus/blob/main/README.md)<br> ```luci-app-accesscontrol-plus``` <br> <li>用于限制特定时间段内设备的网络访问<br> ```luci-app-timecontrol```  |   [kingyond](https://github.com/kingyond/luci-app-accesscontrol-plus) <br>[4IceG](https://github.com/4IceG/luci-app-timecontrol)|      |
