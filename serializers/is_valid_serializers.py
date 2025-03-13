data = {"brand": "Tesla", "model": "Model S", "year": 2023}
serializer = CarSerializer(data=data)

if serializer.is_valid():
    validated_data = serializer.validated_data
    print(validated_data)
else:
    print(serializer.errors)
