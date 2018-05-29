require 'test_helper'

class JuicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @juice = juices(:one)
  end

  test "should get index" do
    get juices_url, as: :json
    assert_response :success
  end

  test "should create juice" do
    assert_difference('Juice.count') do
      post juices_url, params: { juice: { name: @juice.name, sugar: @juice.sugar } }, as: :json
    end

    assert_response 201
  end

  test "should show juice" do
    get juice_url(@juice), as: :json
    assert_response :success
  end

  test "should update juice" do
    patch juice_url(@juice), params: { juice: { name: @juice.name, sugar: @juice.sugar } }, as: :json
    assert_response 200
  end

  test "should destroy juice" do
    assert_difference('Juice.count', -1) do
      delete juice_url(@juice), as: :json
    end

    assert_response 204
  end
end
