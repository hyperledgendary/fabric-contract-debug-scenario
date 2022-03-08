export MICROFAB_CONFIG='{
    "endorsing_organizations":[
        {
            "name": "DigiBank"
        }
    ],
    "channels":[
        {
            "name": "assetnet",
            "endorsing_organizations":[
                "DigiBank"
            ]
        }
    ],
    "capability_level":"V2_0"
}'

LOGGING_SPEC=ccprovider=debug:lifecycle=debug:info
docker run --name microfab --rm -ti -p2005:2005 -p 8080:8080  -e MICROFAB_CONFIG="${MICROFAB_CONFIG}" -e FABRIC_LOGGING_SPEC=$LOGGING_SPEC ibmcom/ibp-microfab

