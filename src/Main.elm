port module Main exposing (main)

-- import Ports exposing (ImagePortData, fileSelected, fileContentRead)
--import Element exposing (Element, rgb)
--import Element.Background as Background

import Browser
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (type_, value)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode
import Json.Encode exposing (Value)


main : Program () Model Msg
main =
    Browser.document { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Model =
    { message : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { message = "Elm program is ready. Get started!" }, Cmd.none )



-- UPDATE


type Msg
    = UpdateStr String
    | SendToJs String


port toJs : String -> Cmd msg


port toElm : (Value -> msg) -> Sub msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateStr str ->
            ( { model | message = str }, Cmd.none )

        SendToJs str ->
            ( model, toJs str )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "Sizing Web"
    , body =
        [ div []
            [ input [ type_ "text", onInput UpdateStr, value model.message ] []
            , div [] [ text model.message ]
            , button
                [ onClick (SendToJs model.message) ]
                [ text "Send To JS" ]
            ]
        ]
    }



-- SUBSCRIPTIONS


decodeValue : Value -> Msg
decodeValue x =
    let
        result =
            Decode.decodeValue Decode.string x
    in
    case result of
        Ok string ->
            UpdateStr string

        Err _ ->
            UpdateStr "Silly JavaScript, you can't kill me!"


subscriptions : Model -> Sub Msg
subscriptions model =
    toElm decodeValue



{-
   view : Model -> Html Msg
   view model =
       Element.layout [] myElement

   myElement : Element msg
   myElement =
       Element.el
           [ Background.gradient { angle=3, steps=[ (rgb 0 0.5 0), (rgb 0.5 0.7 1)]}
           ]
           (Element.text "You've made a styling element")
-}
