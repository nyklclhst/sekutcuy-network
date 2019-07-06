Testing hyperledger fabric network with own javascript and authentication to see data.

<h2>How To Use :</h2>
  1. Install hyperledger fabric development environment. You can see at<a href ="https://hyperledger.github.io/composer/latest/installing/installing-index.html"> here</a>
  2. Start hyperledger fabric network.
  3. Install new network with :
  <pre>composer network install --card PeerAdmin@hlfv1 --archiveFile sekutcuy-network@0.0.3.bna</pre>
  4. Then run this command to start the network :
  <pre>composer network start --networkName sekutcuy-network --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card</pre>
  5. Then run this command to import admin card for fabric network :
  <pre>composer card import --file networkadmin.card</pre>
  6. To test is the card successfully imported run this code :
  <pre>composer network ping --card admin@block-track</pre>
  7. If success then follow this<a href="https://hyperledger.github.io/composer/latest/integrating/enabling-rest-authentication"> instruction </a>to allow authentication for rest server.
  8. For run without namespaces run with code :
  <pre>composer-rest-server -c admin@sekutcuy-network -n never -u true -w true -a true</pre>
