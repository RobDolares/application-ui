/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

// Handle the actions needed to be taken when the user selects a POD
// Set the current POD data and also fetch the conntainers
export const handlePodChange = (
  event,
  podSelfLink,
  podNamespace,
  podName,
  podCluster,
  fetchContainersForPod,
  setCurrentPod
) => {
  // Get the selected POD from the event
  setCurrentPod(event.selectedItem)
  // fetchContainersForPod(podSelfLink, podNamespace, podName, podCluster)
}
