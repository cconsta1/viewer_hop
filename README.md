# viewer_hop

viewer_hop is a previewer for *.ply and *.nxz files uploaded to clowder. 
It uses the 3DHOP JavaScript library to do so.
The current version of viewer_hop works with files that are manually inserted
into the script, i.e., `{ url: "/assets/javascripts/previewers/examples/models/singleres/wing.ply" }`,
but I still can't download a *.ply file from Clowder and make itwork with 3DHOP inside clowder,
i.e., using the variable `referenceUrl`.
