#!/bin/sh

yarn typecheck &
P1=$!
yarn lint &
P2=$!
wait $P1 $P2
