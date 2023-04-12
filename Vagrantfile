Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/focal64"
    config.disksize.size = "10GB"                                   # Plugin install: vagrant plugin install vagrant-disksize

    config.vm.provision :shell, path: "bootstrap.sh"                # Static. Will run the initial setup when the VM is deployed
    
    config.vm.hostname = "s1"                                       # This should be configured programatically
    
    config.vm.network :forwarded_port, guest: 80, host: 8998        # This should be configured programatically, only the host port will need to be changed
    #config.vm.network "private_network",                           # This should be configured programatically
    #    ip: "192.168.53.2",
    #    netmask: "24"
end