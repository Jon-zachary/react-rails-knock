# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
juices = Juice.create([{ name: 'Grape', sugar: 36}, { name: 'Apple', sugar: 24}, {name: 'Orange', sugar: 21}])
users = User.create({ email:'jz@ga.co', password: 'gustave', password_confirmation: 'gustave'})