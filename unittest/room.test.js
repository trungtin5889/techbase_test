"use strict";

const {
    assert,    
    stub,
    mock,    
} = require("sinon");

const services = require("../services/room");
const controller = require("../controller/room");

// Sample data
const room = { RoomName:'Phong 1', ParentRoom: 'Phong Giam Doc' };

/**
 * Stubs:
 *
 * Replace calls to databases or network requests.
 * Stubbing (replacing) *some* of the functionality.
 *
 * Pros:
 * - Replace calls to db
 * - Replace network requests with this
 * - Force an error to test error handling
 *
 */
it("test get rooms by stub", () => {
    // Stub database method
    const getRooms = stub(services, "getRooms");

    // Overrides database.getRooms() implementation
    getRooms.onFirstCall().returns([ room ]);

    // `store.database.getRooms()` returns `[room]`
    assert.match(services.getRooms().length, 2)

    // Put method back to normal 'remove stub'
    getRooms.restore();
});

describe("stubs", () => {

    // Cache the stubbed methods
    let load; let save;
    beforeEach(() => {
        // Stub out the database method
        load = stub(services, "getRooms");

        // Overriding implementation
        load.onFirstCall().returns([]);       
    });

    afterEach(() => {
        // Unset the stubbed methods
        load.restore();
        save.restore();
    });

    it("store starts empty", () => {
        // Stubs the specific method

        // This is an example of a pointless assertion
        // The result is defined above:
        // `load.onFirstCall().returns([]);`
        // There is no need to check the length.
        assert.match(store.database.getRooms().length, 0)
    });

    it("new rooms can be added to the store", () => {
        const currentRooms = [room];
        const newRoom = { RoomName:'Phong 2', ParentRoom: 'Phong Giam Doc' };

        // Can override the initial stubbed method
        load.onFirstCall().returns(currentRooms);

        // Call our method we are testing
        services.insertRooms(null, newRoom.RoomName, newRoom.ParentRoom);
        
        // our newly added room
        assert.calledWith(save, [...currentRooms, newRoom], null);
    });
});

it("mocks", () => {
    // Mock our whole database object
    var db = mock(services);

    // This needs to return something to continue with the method
    // so we stub out the return value of `getRooms()`
    db.expects("getRooms").once().returns([]);

    services.insertRooms(room, () => {});

    // Verify that the mocked expects happened    
    db.verify();
});