#!/bin/bash

#
# SPDX-License-Identifier: Apache-2.0
#

set -eo pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/." && pwd )"

: ${CC_NAME:="assettransfer"}
: ${CCAAS_SERVER_PORT:=9999}
: ${CC_VERSION:=1}


packageChaincode() {

  # address="{{.peername}}_${CC_NAME}_ccaas:${CCAAS_SERVER_PORT}"
  address="172.17.0.1:${CCAAS_SERVER_PORT}"
  prefix=$(basename "$0")
  tempdir=$(mktemp -d -t "$prefix.XXXXXXXX") || error_exit "Error creating temporary directory"
  label=${CC_NAME}_${CC_VERSION}
  mkdir -p "$tempdir/src"

cat > "$tempdir/src/connection.json" <<CONN_EOF
{
  "address": "${address}",
  "dial_timeout": "10s",
  "tls_required": false
}
CONN_EOF

   mkdir -p "$tempdir/pkg"

cat << METADATA-EOF > "$tempdir/pkg/metadata.json"
{
    "type": "ccaas",
    "label": "$label"
}
METADATA-EOF

    tar -C "$tempdir/src" -czf "$tempdir/pkg/code.tar.gz" .
    tar -C "$tempdir/pkg" -czf "$CC_NAME.tar.gz" metadata.json code.tar.gz
    rm -Rf "$tempdir"

   ls -l "$CC_NAME.tar.gz"
}

getPackageId() {
  local cc_package="$CC_NAME.tar.gz"
  cc_sha256=$(shasum -a 256 ${cc_package} | tr -s ' ' | cut -d ' ' -f 1)

  label=${CC_NAME}_${CC_VERSION}
  CHAINCODE_ID=${label}:${cc_sha256}
  echo "CHAINCODE_ID=${CHAINCODE_ID}"
}


packageChaincode
getPackageId
