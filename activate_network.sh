#!/bin/bash
composer network install --card PeerAdmin@hlfv1 --archiveFile seculab-network@0.0.5.bna
composer network start --networkName seculab-network --networkVersion 0.0.5 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer-rest-server -c admin@seculab-network -n never -u true -w true -p 3001
