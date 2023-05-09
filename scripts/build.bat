@echo off
set name_component=alegria-audio-player-api
set image_name=viniciusks13/alegria-audio-player-api

echo "..:: Iniciando script de build do componente %name_component% ::.."

echo ".: Construindo e subindo imagem para o Docker Hub:."
docker buildx build --push --platform linux/arm64/v8,linux/amd64 --tag %image_name% .
