![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=tzp001&show_icons=true&theme=radical)
<div align="center">
<h1 align="center"packages</h1>
<img src="https://img.shields.io/github/issues/tzp001/packages?color=green">
<img src="https://img.shields.io/github/stars/tzp001/packages?color=yellow">
<img src="https://img.shields.io/github/forks/tzp001/packages?color=orange">
<img src="https://img.shields.io/github/languages/code-size/tzp001/packages?color=blueviolet">
</div>

## 收集自用的package
针对的是istoreos，目前还没适配成功
主要收集自用的插件，那些我用不到和觉得不好用的插件不会收录，有些有可玩性的插件也会收录。<br>如果想收录其它插件的朋友，请自己fork仓库，然后自己添加自己想要的插件。<br>
[软件主要来源](https://github.com/kiddin9/openwrt-packages/)（为了方便，这里有的我就不会从源仓库获取，而且[kiddin9](https://github.com/kiddin9)大佬有些还打了补丁）

### 备注
有些开源软件，作者开发时并未留下个人信息，且经过多位作者完善之后，源作者不一定正确，有看到错误和遗漏的，请同志们帮忙指正！

-------------------------------
### 插件说明
[Markdown表格生成工具](https://www.tablesgenerator.com/markdown_tables#)
| 序号 |         目录         | 插件名称                                                           | 插件说明                                                                               | 作者                                                     | 使用说明 |
|:----:|:--------------------:|-------------------------------------------------------------|-------------------------------------------------------------------------------------------|:----------------------------------------------------------:|------|
|   1  |       Gecoosac       | ```gecoosac``` <br> ```luci-app-gecoosac```                                                                                                                                                                                                                                                                                                                 | 集客无线AC控制器                                                                            | [lwb1978](https://github.com/lwb1978/openwrt-gecoosac)  |      |
|   2  |   5G-Modem   | ```fibocom-dial ``` <br> ```fibocom_QMI_WWAN``` <br> ```luci-app-cpe ``` <br> ```luci-app-gobinetmodem``` <br> ```luci-app-hypermodem ``` <br> ```luci-app-modem``` <br> ```luci-app-pcimodem ``` <br> ```luci-app-sms-tool``` <br> ```luci-app-spdmodem ``` <br> ```luci-app-usbmodem``` <br> ```quectel_Gobinet ``` <br> ```quectel_MHI``` <br> ```quectel_QMI_WWAN ``` <br> ```quectel_SRPD_PCIE``` <br> ```quectel_cm_5G ``` <br> ```sendat``` <br> ```sms-tool``` | 5G模块支持 [详细说明](https://github.com/Siriling/5G-Modem-Support/blob/main/README.md) <li>5G驱动 <br>  ```quectel_Gobinet quectel_MHI``` <br> ```quectel_QMI_WWAN quectel_SRPD_PCIE``` <br> ```fibocom_MHI fibocom_QMI_WWAN ``` <br>  <li>拨号工具 <br>  ```quectel_cm_5G fibocom-dial``` <br>  <li>图形化界面设置 <br>    - 拨号 <br>    ```luci-app-modem（新） luci-app-hypermodem``` <br> ```luci-app-usbmodem luci-app-pcimodem``` <br> ```luci-app-gobinetmodem luci-app-spdmodem``` <br>    - 简化版信息插件<br>    ```luci-app-cpe``` <br>    - AT命令工具<br>    ```sendat sms-tool``` <br>    - 短信工具<br>    ```luci-app-sms-tool``` <br> | [Siriling](https://github.com/Siriling/5G-Modem-Support) |      |
|   3  | Accesscontrol|```luci-app-accesscontrol-plus``` <br> ```luci-app-timecontrol```| <li>精准控制网络设备上网时间 [详细说明](https://github.com/kingyond/luci-app-accesscontrol-plus/blob/main/README.md)<br> ```luci-app-accesscontrol-plus``` <br> <li>用于限制特定时间段内设备的网络访问<br> ```luci-app-timecontrol```  |   [kingyond](https://github.com/kingyond/luci-app-accesscontrol-plus) <br>[4IceG](https://github.com/4IceG/luci-app-timecontrol)|      |
|   4  | NAT-DDNS   |```luci-app-aliddns``` <br> ```luci-app-ddns``` <br> ```luci-app-ddnsto``` <br> ```luci-app-tencentddns``` <br> ```luci-app-zerotier```| <li>阿里DDNS<br> ```luci-app-aliddns``` <br> <li>动态域名 DNS（集成阿里DDNS客户端）<br>```luci-app-ddns``` <br> <li>内网穿透<br>```luci-app-ddnsto``` <br> <li>腾讯DDNS<br>```luci-app-tencentddns``` <br> <li>内网穿透工具，小型免费<br>```luci-app-zerotier```|   [honwen](https://github.com/honwen/luci-app-aliddns) <br>[Tencent](https://github.com/Tencent-Cloud-Plugins/tencentcloud-openwrt-plugin-ddns)<br>|      | 
|   5  | NAT-DDNS   |```UnblockNeteaseMusic-Go``` <br> ```UnblockNeteaseMusic``` <br> ```luci-app-unblockmusic``` <br> ```luci-app-unblockneteasemusic``` <br> ```ucl upx upx-static``` | <li>解锁网易云灰色音乐（可集成主程序）<br>```luci-app-unblockmusic``` <br> - Go版本主程序<br>```UnblockNeteaseMusic-Go``` <br> - JS版本主程序<br>```UnblockNeteaseMusic``` <br> <li>解锁网易云灰色音乐（主程序可以从网上下载）<br>```luci-app-unblockneteasemusic``` <br> <li>防止主程序过大，用到的一些压缩工具<br>```ucl upx upx-static``` |   [cnsilvan](https://github.com/cnsilvan/UnblockNeteaseMusic) <br>[UBNMusic](https://github.com/UnblockNeteaseMusic/luci-app-unblockneteasemusic)<br>[lean](https://github.com/lean/lede)<br>[immortalwrt](https://github.com/immortalwrt)<br>|      |
---------------------------
### 部分插件不作收录
| 序号 |                       插件名   |         说明            |        备注        |
|:----:|:----------------------------:|-------------------------|---------------------|
|   1  | ```luci-app-adguardhome```   | 容易占满系统剩余空间造成死机 |    使用docker安装|


