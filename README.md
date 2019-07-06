Testing hyperledger fabric network with own javascript and authentication to see data.

<h2>How To Use :</h2>
 <ol type="1">
  <li>Install hyperledger fabric development environment. You can see at<a href ="https://hyperledger.github.io/composer/latest/installing/installing-index.html"> here</a></li>
  <li>Start hyperledger fabric network.</li>
  <li>Install new network with :</li>
  <pre>composer network install --card PeerAdmin@hlfv1 --archiveFile sekutcuy-network@0.0.3.bna</pre>
  <li>Then run this command to start the network :</li>
  <pre>composer network start --networkName sekutcuy-network --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card</pre>
  <li>Then run this command to import admin card for fabric network :</li>
  <pre>composer card import --file networkadmin.card</pre>
  <li>To test is the card successfully imported run this code :</li>
  <pre>composer network ping --card admin@block-track</pre>
  <li>If success then follow this<a href="https://hyperledger.github.io/composer/latest/integrating/enabling-rest-authentication"> instruction </a>to allow authentication for rest server.</li>
  <li>For run without namespaces run with code :</li>
  <pre>composer-rest-server -c admin@sekutcuy-network -n never -u true -w true -a true</pre>
</ol> 
