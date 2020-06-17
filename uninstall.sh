echo anonchan uninstall script
echo dont expect this to go well
echo uninstalling dependencies
rm -rf node_modules
echo stopping service
systemctl stop anonchan
echo disabling service
systemctl disable anonchan
echo deleting required files...
rm /etc/systemd/system/anonchan.service
echo uninstallation complete